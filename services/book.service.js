const Book = require("../models/book.model");
const {
  createBookSchema,
  updateBookSchema,
} = require("../helpers/validationSchema");
const isValidObjectId = require("../helpers/objectIdValidator");

const createBook = async (req, res) => {
  try {
    const { error } = createBookSchema.validate(req.body);
    if (error) return res.status(400).send({ status: "error", message: error });

    const { title, author, summary } = req.body;

    const newBook = { userId: req.user._id, title, author, summary };

    const book = await Book.create(newBook);
    res.send({
      status: "success",
      message: "Book created successfully",
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateBook = async (req, res) => {
  try {
    const { error } = updateBookSchema.validate(req.body);
    if (error) return res.status(400).send({ status: "error", message: error });
    console.log("userId", req.user._id);

    const { bookId } = req.params;
    if (!isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: "error", message: "invalid ObjectId" });

    const book = await Book.findOneAndUpdate(
      { _id: bookId, userId: req.user._id },
      {
        $set: { ...req.body },
      },
      { new: true }
    );

    if (!book)
      return res
        .status(404)
        .send({ status: "error", message: "update failed, book not found" });

    res.send({
      status: "success",
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    if (!isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: "error", message: "invalid ObjectId" });

    const book = await Book.findOneAndDelete({
      _id: bookId,
      userId: req.user._id,
    });

    if (!book)
      return res
        .status(404)
        .send({ status: "error", message: "deelte failed, book not found" });

    res.send({
      status: "success",
      message: "Book deleted successfully",
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const readBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    if (!isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: "error", message: "invalid ObjectId" });

    const book = await Book.findById(bookId).populate("userId", "username");

    if (!book)
      return res
        .status(404)
        .send({ status: "error", message: "book not found" });

    res.send({
      status: "success",
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const readAllBooks = async (req, res) => {
  try {
    const { sortBy, sortOrder, filterField, filterValue } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    console.log("page, limit", page, limit);

    let sort = {
      createdAt: -1,
    };
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    let match = {};
    if (filterField && filterValue) {
      match[filterField] = { $regex: new RegExp(filterValue, "i") };
    }

    const aggregationPipeline = [
      { $match: match },
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $facet: {
          data: [
            { $sort: sort },
            { $skip: (page - 1) * limit },
            { $limit: parseInt(limit) },
            {
              $project: {
                userId: 0,
                __v: 0,
                userDetails: {
                  password: 0,
                  __v: 0,
                  createdAt: 0,
                  updatedAt: 0,
                },
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
      {
        $project: {
          data: 1,
          totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ];

    const books = await Book.aggregate(aggregationPipeline);

    res.send({
      status: "success",
      data: {
        page: page,
        limit: limit,
        totalCount: books[0].totalCount,
        data: books[0].data,
      },
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).send({
      status: "error",
      error: err,
    });
  }
};

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  readBook,
  readAllBooks,
};
