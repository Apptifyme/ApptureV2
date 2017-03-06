import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ArticlePage } from '../pages/article/article';
import { EventDetailsPage } from '../pages/event-details/event-details';
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
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArticlePage,
    EventDetailsPage,
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
    WalkthroughPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArticlePage,
    EventDetailsPage,
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
    WalkthroughPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
