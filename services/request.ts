import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { END_POINTS } from './api';
import HttpClient from './http-client';
import { ArticleParams, CreateArticleBody, UpdateArticleBody } from './types';

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

  public getArticles = (params: ArticleParams): AxiosPromise<any> => {
    return this.instance.get<any>(END_POINTS.ARTICLES, {params})
  }

  public getArticlesById = (_id: string): AxiosPromise<any> => {
    return this.instance.get<any>(`${END_POINTS.ARTICLES}/${_id}`)
  }

  public createArticle = (body: CreateArticleBody): AxiosPromise<any> => {
    return this.instance.post<any>(END_POINTS.ARTICLES, body)
  }

  public updateArticle = (body: UpdateArticleBody, _id: string): AxiosPromise<any> => {
    return this.instance.put<any>(`${END_POINTS.ARTICLES}/${_id}`, body)
  }

  public deleteArticle = (_id: string): AxiosPromise<any> => {
    return this.instance.delete<any>(`${END_POINTS.ARTICLES}/${_id}`)
  }
}

const request = new MainApi();


export default request;