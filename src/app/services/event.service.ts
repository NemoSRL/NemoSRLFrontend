import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductEditDataService {
  private param1Subject = new Subject<string>();
  param1Observable$ = this.param1Subject.asObservable();

  emitParam1(object: any) {
    this.param1Subject.next(object);
  }
}
@Injectable({
  providedIn: 'root'
})
export class LabelEditDataService {
  private param1Subject = new Subject<string>();
  param1Observable$ = this.param1Subject.asObservable();

  emitParam1(object: any) {
    this.param1Subject.next(object);
  }
}
@Injectable({
  providedIn: 'root'
})
export class ReportEditDataService {
  private param1Subject = new Subject<string>();
  param1Observable$ = this.param1Subject.asObservable();

  emitParam1(object: any) {
    this.param1Subject.next(object);
  }
}
@Injectable({
  providedIn: 'root'
})
export class ProductDetailDataService {
  private param1Subject = new Subject<string>();
  param1Observable$ = this.param1Subject.asObservable();

  emitParam1(object: any) {
    this.param1Subject.next(object);
  }
}
@Injectable({
  providedIn: 'root'
})
export class PersonaleDetailDataService {
  private param1Subject = new Subject<string>();
  param1Observable$ = this.param1Subject.asObservable();

  emitParam1(object: any) {
    this.param1Subject.next(object);
  }
}
@Injectable({
  providedIn: 'root'
})
export class LabelDetailDataService {
  private param1Subject = new Subject<string>();
  param1Observable$ = this.param1Subject.asObservable();

  emitParam1(object: any) {
    this.param1Subject.next(object);
  }
}

