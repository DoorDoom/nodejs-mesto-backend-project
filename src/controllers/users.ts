import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import NotFoundError from "../errors/not-found-error";
import { Error } from "mongoose";
import BadRequestError from "../errors/bad-request-error";
import { constants } from "http2";

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => new Error(""));
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(
      () => new NotFoundError("Пользователь по указанному _id не найден")
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(constants.HTTP_STATUS_CREATED).send({ data: user });
  } catch (error) {
    if (error instanceof Error.CastError || Error.ValidationError)
      return next(
        new BadRequestError(
          "Переданы некорректные данные при создании пользователя"
        )
      );
    next(error);
  }
};

export const patchMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user;
    const { name, about } = req.body;
    const user = await User.findOneAndUpdate(
      { _id },
      { name, about },
      { new: true }
    ).orFail(
      () => new NotFoundError("Пользователь по указанному _id не найден")
    );
    res.status(constants.HTTP_STATUS_ACCEPTED).send({ data: user });
  } catch (error) {
    if (error instanceof Error.CastError || Error.ValidationError)
      return next(
        new BadRequestError(
          "Переданы некорректные данные при создании пользователя"
        )
      );
    next(error);
  }
};

export const patchMyAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user;
    const { avatar } = req.body;
    const user = await User.findOneAndUpdate(
      { _id },
      { avatar },
      { new: true }
    ).orFail(
      () => new NotFoundError("Пользователь по указанному _id не найден")
    );
    res.status(constants.HTTP_STATUS_ACCEPTED).send({ data: user });
  } catch (error) {
    if (error instanceof Error.CastError || Error.ValidationError)
      return next(
        new BadRequestError(
          "Переданы некорректные данные при создании пользователя"
        )
      );
    next(error);
  }
};
