import { Controller, Get, Redirect, Render } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  @Render('home')
  renderHome() {}

  @Get('*')
  @Redirect('/')
  handleNotFound() {}
}
