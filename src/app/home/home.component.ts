import { Component, inject, OnInit } from '@angular/core';
import { fruitInterface } from '../shared/entities';
import { mockfruits } from '../shared/mockFruits';
import { FruitService } from '../core/services/fruit.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  //Je déclare les variables
  fruits: fruitInterface[] = mockfruits;
  panier: fruitInterface[] = [];

  //J'injecte les services
  service = inject(FruitService);
  route = inject(ActivatedRoute);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getFruits();
  };

  //Je recepère le liste des fruits
  getFruits(){
    this.fruits = this.service.fetchAll();
  };

  //Compteur pour la quantité
  ajouter(fruit: fruitInterface){
    fruit.quantite ++;
  };
  soustraire(fruit: fruitInterface){
    if(fruit.quantite > 0){
      fruit.quantite --;
    }
  };

  //Met à jour le panier
  updatePanier(fruit: fruitInterface): void {
    const index = this.panier.findIndex(item => item.nom === fruit.nom);
    if (index === -1 && fruit.quantite > 0) {
      // J'ajoute au panier si ce n'est pas déjà dedans
      this.panier.push({ ...fruit });
    } else {
      // J'update le panier si le fruit est déjà dans la panier
      this.panier[index].quantite += fruit.quantite;
    }
    // Reset le compteur à 0
    fruit.quantite = 0;
  }

  //Calcul du nombre de fruit total dans la panier
  get qteTotal(){
    return this.panier.reduce((acc, fruit) => acc + fruit.quantite, 0);
  };

  //Calcul le prixHT total
  get prixHtTotal(){
    return this.panier.reduce((acc, fruit) => acc + fruit.prixHT * fruit.quantite, 0);
  };

  //Calcul le prix TTC total
   get prixTtcTotal(){
    const tva = 0.2;
    return (this.prixHtTotal * (1 + tva));
  };

  //Supprime une ligne du panier
  deleteRow(fruit: fruitInterface){
    const index = this.panier.findIndex(item => item.nom === fruit.nom);
      this.panier.splice(index, 1);
  };

  //Vide entièrement le panier
  deleteAll() {
    //Vide le panier
    this.panier = [];
    //Remet à 0 le compteur pour la qté
    this.fruits.forEach(fruit => fruit.quantite = 0);
  };
}