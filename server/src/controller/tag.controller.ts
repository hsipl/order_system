import { NextFunction, Request, Response } from "express";
import { TagRepository } from "../repository/tag.respository";
import { TagService } from "../services/tag.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";
import { Tag } from "../entity/tag";

class TagController {
    public readonly service: TagService;
    constructor(service: TagService) {
        this.service = service;
    }

    async get(req: Request, res: Response, next: NextFunction) {
        const query = new Tag();
        Object.assign(query, req.query)
        const tags = await this.service.get(query);
        res.status(200).json(tags);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);
        if (!id) {
            return next(
                new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
            );
        }
        try {
            const tag = await this.service.getById(id);
            if (!tag) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
            }
            res.status(200).json(tag);
        } catch (error) {
            console.log("create db error: ", error);
            return next(
                new ErrorHandler(
                    errorStatusCode.InternalServerError,
                    errorMsg.InternalServerError
                )
            );
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const { tag, status }: { tag: string, status: number } = req.body;
        if (!tag || status === undefined) {
            return next(
                new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
            );
        }
        try {
            const tagExist = await this.service.checkExistByTag(tag);
            if (tagExist) {
                return next(
                    new ErrorHandler(errorStatusCode.Forbidden, errorMsg.DataAlreadyExist)
                );
            }
            const newTag = await this.service.create(tag, status);
            res.status(200).send({ result: true });
        } catch (error) {
            console.log("create db error: ", error);
            return next(
                new ErrorHandler(
                    errorStatusCode.InternalServerError,
                    errorMsg.InternalServerError
                )
            );
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);
        const { tag, status }: { tag: string, status: number } = req.body;
        if (!tag || status === undefined) {
            return next(
                new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
            );
        }
        try {
            const checkIsExist = await this.service.checkExistByID(id);
            if (!checkIsExist) {
                return next(
                    new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
                );
            }
            const checkUpdateExitByTag = await this.service.checkUpdateExitByTag(id, tag);
            if (checkUpdateExitByTag) {
                return next(
                    new ErrorHandler(errorStatusCode.Forbidden, errorMsg.DataAlreadyExist)
                );
            }
            const updatedRes = await this.service.update(id, tag, status);
            if (updatedRes === undefined) {
                return next(
                    new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
                );
            }
            res.status(200).send({ result: true });
        } catch (error) {
            console.log("create db error: ", error);
            return next(
                new ErrorHandler(
                    errorStatusCode.InternalServerError,
                    errorMsg.InternalServerError
                )
            );
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);
        if (!id) {
            return next(
                new ErrorHandler(
                    errorStatusCode.BadRequest,
                    errorMsg.ParameterError
                )
            );
        }
        try {
            const checkIsExist = await this.service.checkExistByID(id);
            if (!checkIsExist) {
                return next(
                    new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
                );
            }
            const deletedRes = await this.service.delete(id);
            if (deletedRes === undefined) {
                return next(
                    new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
                );
            }
            res.status(200).send({ result: true });
        } catch (error) {
            return next(
                new ErrorHandler(
                    errorStatusCode.InternalServerError,
                    errorMsg.InternalServerError
                )
            );
        }
    }
}

const tagRep = new TagRepository();
const tagService = new TagService(tagRep);
const tagController = new TagController(tagService);

export default tagController;