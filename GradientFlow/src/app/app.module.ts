import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button'
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

import { SideNavService } from './Layout/sidenav_service';
import { UserService } from './Services/DataServices/user.service';
import { QuestionService } from './Services/DataServices/question.service';

import { AppComponent } from './app.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { HeaderComponent } from './Layout/header/header.component';
import { DrawerComponent } from './Layout/drawer/drawer.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { AiChatPageComponent } from './Pages/IAChat/aiChat-page.component';
import { AuthGuard } from './Services/auth.service';
import { LoginComponent } from './Pages/login/login.component';
import { NavigationItemComponent } from './Layout/drawer/navigation-item/navigation-item.component';
import { BaseGridComponent } from './Common Components/base-grid/base-grid.component';
import { SearchComponent } from './Pages/search/search.component';


import { DataModelFactory } from './DataModel/Mock/dataModelFactory';
import { ColumsDefinitionFactory } from './DataModel/Mock/columsDefinitionFactory';
import { SearchBarComponent } from './Common Components/search-bar/search-bar.component';
import { ProjectService } from './Services/DataServices/project.service';
import { MessageBoxComponent } from './Common Components/base-chat/message-box/message-box.component';
import { BaseChatSessionComponent } from './Common Components/base-chat/base-chat-session.component';
import { ChatService } from './Services/DataServices/chat.service';
import { BaseChatUIComponent } from './Common Components/base-chatUI/base-chatUI.component';
import { NewChatSessionFormComponent } from './Common Components/base-chat/new-chat-session-form/new-chat-session-form.component';
import { AiService } from './Services/AiService/ai.service';
import { AiApiService } from './Services/AiService/ai-api.service';
import { HttpClient, HttpClientModule, HttpHandler, HttpParams } from '@angular/common/http';
import { ConfigsService } from './Services/ConfigurationService/configuration.service';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatBadgeModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
    declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    DrawerComponent,
    NavigationItemComponent,
    HomePageComponent,
    SearchComponent,
    HeaderComponent,
    AiChatPageComponent,
    LoginComponent,
    BaseGridComponent,
    SearchBarComponent,
    MessageBoxComponent,
    BaseChatSessionComponent,
    NewChatSessionFormComponent,
    BaseChatUIComponent,
    
  ],
  providers: [
    SideNavService,
    AuthGuard,
    UserService,
    AiService,
    AiApiService,
    ProjectService,
    ConfigsService,
    QuestionService,
    DataModelFactory,
    HttpClient,
    ColumsDefinitionFactory,
    ChatService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
