import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "src/app.module";
import { DescriptionText } from "src/swagger/descriptions";
import { AuthModule } from "src/modules/auth/auth.module";
import { UserModule } from "src/modules/user/users.module";
import { TaskModule } from "src/modules/task/task.module";

export class SwaggerDocument {
  constructor(private app: INestApplication) {
    this.createFactory();
    this.createGOFEAPI();
  }

  async createFactory() {
    this.app = await NestFactory.create(AppModule);
  }

  createGOFEAPI() {
    const goOptions = new DocumentBuilder()
      .setTitle("GO FE API")
      .setDescription(DescriptionText.descGODocs)
      .setVersion("1.0")
      .addBearerAuth()
      .build();
    const goDocument = SwaggerModule.createDocument(this.app, goOptions, {
      include: [
        AuthModule,
        UserModule,
        TaskModule,
      ],
    });

    SwaggerModule.setup("docs", this.app, goDocument);
  }
}
