import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000,
  withCredentials: true,
}
export class HttpRequest {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = sessionStorage.getItem('token') || ''
        token && (config.headers['authorization'] = token)
        return config
      }
    )

    this.service.interceptors.response.use((response: AxiosResponse) => {
      if (response.status === 200) {
        return response.data
      }
      return Promise.reject(response.data)
    })
  }
  get(url: string, params?: object): Promise<any> {
    return this.service.get(url, { params })
  }
  post(url: string, params?: object | string): Promise<any> {
    return this.service.post(url, params)
  }
  put(url: string, params?: object): Promise<any> {
    return this.service.put(url, params)
  }
  delete(url: string, params?: object): Promise<any> {
    return this.service.delete(url, { params })
  }
}

export default new HttpRequest(config)
