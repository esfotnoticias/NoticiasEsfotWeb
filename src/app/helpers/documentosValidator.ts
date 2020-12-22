import { FileItem } from '../models/file-item';

export class documentValidator{
  private accepType =['application/pdf'];
  validateType(fileType:string):boolean{
    return fileType===''|| fileType===undefined
    ?false
    :this.accepType.includes(fileType);
  }

  checkDropped(fileName:string, files:FileItem[]):boolean{
    for(const file of files){
      if(file.name===fileName){
        return true;
      }
    }
    return false;
  }

}
