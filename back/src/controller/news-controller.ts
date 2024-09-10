import { Request, Response, NextFunction } from "express";
import { AddNewsDto, GetNewsDto, UpdateNewsDto } from "../dto/news-dto";
import { prisma } from "../util/prisma-client";
import HttpException from "../util/http-exception";
import { IdQueryDto } from "../dto/tourist-spot-dto";

export const addNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newsData = req.body as AddNewsDto;

    const newArticle = await prisma.newsArticle.create({
      data: { ...newsData, userId: req.user.id },
    });

    res.status(200).json(newArticle);
  } catch (e) {
    next(e);
  }
};

export const getNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqData = req.query as unknown as GetNewsDto;
    const limit: number = parseInt(reqData.limit as unknown as string);
    const page: number = parseInt(reqData.page as unknown as string);
    const news = await prisma.newsArticle.findMany({
      skip: limit * (page - 1),
      take: limit,
      include: {
        Image: { select: { imageURL: true }, take: 1 as number },
      },
      orderBy: { createdAt: "desc" },
    });
    const formattedResponse = news.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      createdAt: article.createdAt,
      imageUrl: article.Image[0] ? article.Image[0].imageURL : "",
    }));

    res.status(200).json(formattedResponse);
  } catch (e) {
    next(e);
  }
};

export const getNewsAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqData = req.query as unknown as GetNewsDto;
    const limit: number = parseInt(reqData.limit as unknown as string);
    const page: number = parseInt(reqData.page as unknown as string);
    let news;
    if (req.user.role === "ADMIN") {
      news = await prisma.newsArticle.findMany({
        skip: limit * (page - 1),
        take: limit,
        include: { author: { select: { email: true } } },
        orderBy: { createdAt: "desc" },
      });
    } else {
      news = await prisma.newsArticle.findMany({
        skip: reqData.limit * (page - 1),
        take: limit,
        where: { userId: req.user.id },
        include: { author: { select: { email: true } } },
        orderBy: { createdAt: "desc" },
      });
    }

    const formattedResponse = news.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      createdAt: article.createdAt,
      author: article.author.email,
    }));

    res.status(200).json(formattedResponse);
  } catch (e) {
    next(e);
  }
};

export const updateNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqData = req.body as UpdateNewsDto;
    const article = await prisma.newsArticle.findFirst({
      where: { id: reqData.id },
    });

    if (!article) throw new HttpException(404, "Not found");
    if (req.user.role != "ADMIN" && req.user.id != article?.userId)
      throw new HttpException(401, "Unauthorized");

    const updatedArticle = await prisma.newsArticle.update({
      where: { id: reqData.id },
      data: reqData,
    });

    res.status(200).json(updatedArticle);
  } catch (e) {
    next(e);
  }
};

export const deleteNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = (req.query as unknown as IdQueryDto).id;
    const article = await prisma.newsArticle.findFirst({
      where: { id: articleId },
    });
    if (!article) throw new HttpException(404, "Article not found");
    if (req.user.role != "ADMIN" && req.user.id != article?.userId)
      throw new HttpException(401, "Unauthorized");

    const deletedArticle = await prisma.newsArticle.delete({
      where: { id: articleId },
    });

    res.status(200).json(deletedArticle);
  } catch (e) {
    next(e);
  }
};

export const getArticleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = (req.query as unknown as IdQueryDto).id;
    const newsArticle = await prisma.newsArticle.findFirst({
      where: { id: articleId },
      include: { Image: true, Document: true },
    });
    if (!newsArticle) throw new HttpException(404, "Article not found");

    res.status(200).json(newsArticle);
  } catch (e) {
    next(e);
  }
};

export const newsCountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const count = await prisma.newsArticle.count();

    res.status(200).json(count);
  } catch (e) {
    next(e);
  }
};
