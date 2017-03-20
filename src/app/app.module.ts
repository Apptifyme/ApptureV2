import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ArticlePage } from '../pages/article/article';
import { EventsPage } from '../pages/events/events';
import { ImageCategoryPage } from '../pages/image-category/image-category';
import { ImageGalleryPage } from '../pages/image-gallery/image-gallery';
import { ImageModalPage } from '../pages/image-modal/image-modal';
import { LandingPage } from '../pages/landing/landing';
import { LightboxPage } from '../pages/lightbox/lightbox';
import { RssPage } from '../pages/rss/rss';
import { RssArticlePage } from '../pages/rss-article/rss-article';
import { RssSinglePage } from '../pages/rss-single/rss-single';
import { SocialPage } from '../pages/social/social';
import { VideoCategoryPage } from '../pages/video-category/video-category';
import { VideoGalleryPage } from '../pages/video-gallery/video-gallery';
import { VideoModalPage } from '../pages/video-modal/video-modal';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { HttpModule } from '@angular/http';
import { API } from '../providers/api';
import { commonServices } from '../providers/common-services';
import { ServerImage } from '../pipes/server-image.pipe';

import { WindowRef } from './windows-ref';
import {HttpServiceOfActicle} from '../pages/article/article.service';
import {HttpService} from '../pages/home/home.service'
import {ContactPage} from '../pages/contact/contact';
import {HttpServiceOfEvent} from '../pages/events/event.service'
import {HttpServiceOfSocial} from '../pages/social/social.service';
import {HttpServiceOfVideoGallary} from '../pages/video-gallery/video-gallery.service';
import {HttpServiceOfVideoCategory} from '../pages/video-category/video-category.service'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArticlePage,
    EventsPage,
    ImageCategoryPage,
    ImageGalleryPage,
    ImageModalPage,
    LandingPage,
    LightboxPage,
    RssPage,
    RssSinglePage,
    RssArticlePage,
    SocialPage,
    VideoCategoryPage,
    VideoGalleryPage,
    VideoModalPage,
    WalkthroughPage,
    ServerImage,
      ContactPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArticlePage,
    EventsPage,
    ImageCategoryPage,
    ImageGalleryPage,
    ImageModalPage,
    LandingPage,
    LightboxPage,
    RssPage,
    RssSinglePage,
    RssArticlePage,
    SocialPage,
    VideoCategoryPage,
    VideoGalleryPage,
    VideoModalPage,
    WalkthroughPage,
      ContactPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    API,
    commonServices,
    WindowRef,
    HttpServiceOfActicle,
      HttpService,
      HttpServiceOfEvent,
      HttpServiceOfSocial,
      HttpServiceOfVideoGallary,
      HttpServiceOfVideoCategory
  ]
})
export class AppModule { }
