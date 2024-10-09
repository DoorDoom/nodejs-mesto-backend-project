import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import Card from "../models/card";
import NotFoundError from "../errors/not-found-error";
import BadRequestError from "../errors/bad-request-error";

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => new Error(""));
};

export const getCardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId).orFail(
      () => new NotFoundError("Передан несуществующий _id карточки")
    );
    res.send(card);
  } catch (error) {
    next(error);
  }
};

export const postCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, owner, link });
    res.send({ data: card });
  } catch (error) {
    if (error instanceof Error.CastError)
      return next(
        new BadRequestError(
          "Переданы некорректные данные при создании карточки"
        )
      );
    next(error);
  }
};

export const deleteLikesCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardId } = req.params;
    const owner = req.user._id;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: owner } },
      { new: true }
    ).orFail(() => new NotFoundError("Передан несуществующий _id карточки"));
    res.send({ data: card });
  } catch (error) {
    if (error instanceof Error.CastError)
      return next(
        new BadRequestError(
          "Переданы некорректные данные для постановки/снятии лайка"
        )
      );
    next(error);
  }
};

export const putLikesCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardId } = req.params;
    const owner = req.user._id;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: owner } },
      { new: true }
    ).orFail(() => new NotFoundError("Передан несуществующий _id карточки"));
    res.send({ data: card });
  } catch (error) {
    if (error instanceof Error.CastError)
      return next(
        new BadRequestError(
          "Переданы некорректные данные для постановки/снятии лайка"
        )
      );
    next(error);
  }
};

export const addOwnerCard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user = {
    _id: "67028bcf566e5018bb766c8d",
  };

  next();
};
