import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoadingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
