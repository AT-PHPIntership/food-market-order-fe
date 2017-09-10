import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TemplateComponent } from './component/template';
import { routing } from './app.route';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { SharedModule } from './shared/shared.module';
import { UserProfileComponent} from './component/userprofile/userprofile.component';
import { RangePipe } from './pipe/range.pipe';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from '../environments/environment';
import { TokenService } from './service/token.service';

const DROPZONE_CONFIG: DropzoneConfigInterface = {
    method: 'POST',
    url: environment.hostname + '/api/users/upload-image',
    // maxFiles: 1,
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    addRemoveLinks: true,
    uploadMultiple: false,
    resizeWidth: 300,
    resizeHeight: 300
};

@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
        LoginComponent,
        UserProfileComponent,
        RegisterComponent,
        RangePipe
    ],
    imports: [
        routing,
        BrowserModule,
        SharedModule.forRoot(),
        DropzoneModule.forRoot(DROPZONE_CONFIG),
    ],
    providers: [TokenService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
