import { Observable } from 'rxjs';
export class FileItem {
  public name: string;
  public archivo:File;
  public uploading:boolean;
  public uploadPercent: Observable<number>;
  public downloadURL: Observable<string>;
  public progreso: number;
  public url:string;
  constructor(public file: File = file) {
    this.archivo=file;
    this.name = file.name;
    this.progreso=0;
    this.uploading=false;
  }
}
