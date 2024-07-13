import { Injectable } from '@angular/core';
import { mockfruits } from '../../shared/mockFruits';
import { fruitInterface } from '../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  fetchAll(){
    return mockfruits;
  }

}
