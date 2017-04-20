import { Http } from '@angular/http/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}
