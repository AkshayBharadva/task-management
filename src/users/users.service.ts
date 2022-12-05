import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { genSalt, hash } from 'bcrypt';
import { JWT, REPOSITORY } from 'src/constants';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORY.USER)
    private userRepository: Repository<User>,
  ) // private jwtService: JwtService,
  {}

  async signin(createUserDto: CreateUserDto): Promise<object | any> {
    const { username, password } = createUserDto;

    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException('invalid username or password');
    }

    const hashedpassword = await this.getHashedPassword(password, user.salt);

    if (hashedpassword === user.password) {
      const { password, salt, ...payload } = user;
      const data = { ...payload, issuer: JWT.ISSUER, audience: JWT.AUDIENCE };
      console.log(data);
      const token = sign(data, JWT.SECRET, { expiresIn: JWT.EXPIRE_IN });
      // save user token
      // const token = await this.jwtService.sign(data);
      return { token };
    } else {
      throw new UnauthorizedException('invalid username or password');
    }
  }

  async signup(createUserDto: CreateUserDto): Promise<void> {
    const { username, password } = createUserDto;

    const salt = await genSalt();
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.getHashedPassword(password, salt);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return;
  }

  private async getHashedPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return hash(password, salt);
  }
  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }
}
