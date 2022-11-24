import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as Bcrypt from 'bcrypt';
import { Users } from '../../entities/Users';
import { Repository, Entity } from 'typeorm';
import { Entities } from '../../entities/Entities';
import { UsersPhones } from '../../entities/UsersPhones';
import { UsersEmail } from '../../entities/UsersEmail';
import { UsersRoles } from '../../entities/UsersRoles';
import { Roles } from '../../entities/Roles';

const saltOrRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Entities) private entity: Repository<Entities>,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(UsersPhones) private usersPhone: Repository<UsersPhones>,
    @InjectRepository(UsersEmail) private usersEmail: Repository<UsersEmail>,
    @InjectRepository(UsersRoles) private usersRoles: Repository<UsersRoles>,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string) {
    const user = await this.usersRepo.findOne({
      relations: {
        usersRoles: {
          usroRole: true,
        },
        usersEmail: true,
      },
      where: [{ userName: username }],
    });
    const compare = await Bcrypt.compare(pass, user.userPassword);
    if (compare) {
      const { userPassword, ...result } = user;
      return result;
    }
  }

  public async login(user: any) {
    const payload = {
      username: user.userName,
      sub: user.userEntityId,
      email: user.usersEmail ? user.usersEmail[0].pmailAddress : null,
      roles: user.usersRoles ? user.usersRoles[0].usroRole.roleName : null,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async signup(fields: any) {
    try {
      const EntityId = await this.entity.save({});

      let hashpassword = fields.password;
      hashpassword = await Bcrypt.hash(hashpassword, saltOrRounds);
      const user = await this.usersRepo.save({
        userEntityId: EntityId.entityId,
        userFirstName: fields.userFirstName,
        userLastName: fields.userLastName,
        userName: fields.userName,
        userModifiedDate: new Date(),
        userPassword: hashpassword,
      });
      await this.usersPhone.save({
        uspoEntityId: EntityId.entityId,
        uspoNumber: fields.uspoNumber,
        uspoModifiedDate: new Date(),
        uspoPontyCode: fields.uspoPontyCode,
      });
      await this.usersEmail.save({
        pmailEntityId: EntityId.entityId,
        pmailAddress: fields.pmailAddress,
        pmailModifiedDate: new Date(),
      });
      await this.usersRoles.save({
        usroEntityId: EntityId.entityId,
        usroRoleId: fields.usroRoleId,
        usroModifiedDate: new Date(),
      });
      const { userPassword, ...result } = user;
      return result;
    } catch (error) {
      return error.message;
    }
  }
}
