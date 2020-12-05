import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaunchModule } from './launch/launch.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(process.cwd(), 'src/graphql.ts') },
      context: ({req}) => ({ headers: req.headers})
    }),
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    LaunchModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }