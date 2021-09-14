import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/usersRepository"



class UsersService {
    async create( email : string) {
        const usersRepository = getCustomRepository(UsersRepository)

        const userExist = await usersRepository.findOne({
            email
        })

        if (userExist) {
            return userExist
        }

        const user = usersRepository.create({
            email
        })

        await usersRepository.save(user)

        return user
    }
}

export { UsersService }