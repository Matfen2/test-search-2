import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private authService: AuthService) {}

  results: any;
  searchedTitle: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  searchListGame = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  searchGame() {
    if (this.searchListGame.valid) {
      this.loading = true;

      const title = this.searchListGame.value.title;

      this.authService.getSingleGame(title).subscribe(
        (res) => {
          this.results = res.data;
          this.searchedTitle = title ?? '';
          this.loading = false;
          this.errorMessage = '';
        },
        (error) => {
          console.error(error);
          this.errorMessage =
            "Une erreur s'est produite lors de la recherche du jeu.";
          this.loading = false;
        }
      );
    }
  }

  ngOnInit(): void {}
}
