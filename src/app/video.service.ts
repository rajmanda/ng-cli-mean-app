import { Video } from './video';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from './../environments/environment';

@Injectable()
export class VideoService {

  private _getUrl = environment._getUrl;
  private _postUrl = environment._postUrl;
  private _putUrl = environment._putUrl;
  private _deleteUrl = environment._deleteUrl;

  constructor(private _http: Http) { }

  getVideos() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

  addVideo(video: Video) {
    //console.log('Adding videi' + video);
    //console.log('Adding videi' + video.image);

    var payload = new FormData();

    payload.append("title", video.title);
    payload.append('description', video.description);
    payload.append('image', video.image);
    payload.append('url', video.url);


    return this._http.post(this._postUrl, payload)
      .map((response: Response) => response.json());
  }

  uvideo: Video = new Video();
  updateVideo(video: Video) {
    
    this.uvideo._id = video._id;
    this.uvideo.description = video.description;
    this.uvideo.title = video.title;

    const findstring = 'watch?v=';

    if (video.url.indexOf(findstring) >= 0) {
      this.uvideo.url = video.url.replace(findstring, 'embed/');
    } 
 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this._putUrl + this.uvideo._id, JSON.stringify(this.uvideo), options)
      .map((response: Response) => response.json());
  }

  deleteVideo(video: Video) {
    return this._http.delete(this._deleteUrl + video._id)
      .map((response: Response) => response.json());
  }

}
