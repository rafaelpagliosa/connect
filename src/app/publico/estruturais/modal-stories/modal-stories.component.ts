import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-stories',
  templateUrl: './modal-stories.component.html',
  styleUrls: ['./modal-stories.component.scss'],
})
export class ModalStoriesComponent implements OnInit {

  images: string[];
  titles: string[];
  currentIndex: number;
  idEvento: any;

  constructor(
    public dialogRef: MatDialogRef<ModalStoriesComponent>,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { images: string[], titles: string[], currentIndex: number, idEvento: number }
  ) {
    this.images = data.images || [];
    this.titles = data.titles || [];
    this.currentIndex = data.currentIndex || 0;
    this.idEvento = data.idEvento || 0
  }

  ngOnInit(): void {
  }

  getCurrentImage(): string {
    return this.images[this.currentIndex] || '';
  }

  getCurrentTitle(): string {
    return this.titles[this.currentIndex] || '';
  }

  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.dialogRef.close();
    }
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
