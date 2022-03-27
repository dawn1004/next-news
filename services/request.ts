import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { END_POINTS } from './api';
import HttpClient from './http-client';
import { CreateArticleBody } from './types';

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

class MainApi extends HttpClient {
  public constructor() {
    super(BASE_URL? BASE_URL : '');

    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    return config;
  };


  /**********API REQUEST**********/
  // public getEveryNews = (params: GetEveryNewsParams): AxiosPromise<EveryNews> => {
  //   return this.instance.get<any>(END_POINTS.EVERYTHING_NEWS, {params: {...params, apiKey: API_KEY}})
  // };

  public getArticles = (): AxiosPromise<any> => {
    return this.instance.get<any>(END_POINTS.ARTICLES)
  }

  public createArticle = (body: CreateArticleBody): AxiosPromise<any> => {
    return this.instance.post<any>(END_POINTS.ARTICLES, body)
  }
}

const request = new MainApi();


export default request;