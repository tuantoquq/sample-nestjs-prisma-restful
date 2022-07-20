import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IResponse } from 'src/common/interfaces';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.OK).send({
        message: 'Create new user successfully',
        data: newUser,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: err.message,
        data: null,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const listUser = await this.usersService.findAll();
      return res.status(HttpStatus.OK).send({
        message: 'Get list user successfully',
        data: listUser,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: err.message,
        data: null,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const user = await this.usersService.findOne(+id);
      return response.status(HttpStatus.OK).send({
        message: `Get user by id ${id} successfully`,
        data: user,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: err.message,
        data: null,
      });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const updateUser = await this.usersService.update(+id, updateUserDto);
      return res.status(HttpStatus.OK).send({
        message: `Update user with id ${id} successfully`,
        data: updateUser,
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: err.message,
        data: null,
      });
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<IResponse>> {
    try {
      const user = await this.usersService.remove(+id);
      return res.status(HttpStatus.OK).send({
        message: `Delete user by id ${id} successfully`,
        data: user,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: err.message,
        data: null,
      });
    }
  }
}
