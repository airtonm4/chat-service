import { EntityRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";


@EntityRepository(Message)
class MessagesRespository extends Repository<Message>{}

export{ MessagesRespository }