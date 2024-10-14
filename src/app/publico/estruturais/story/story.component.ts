import { Component, Input, Output, EventEmitter, OnInit, HostListener, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalStoriesComponent } from '../../estruturais/modal-stories/modal-stories.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idEvento = params.get('id');
    });
  }

  @Input() stories: { user: string, userId: any, img: string }[] = [];
  @Output() storyClick = new EventEmitter<{ user: string, userId: any, img: string }>();

  private isDragging = false;
  private startX: number = 0;
  private scrollLeft: number = 0;
  idEvento: any;

  onStoryClick(story: any) {
    this.storyClick.emit(story);
    console.log(story);

    const dialogRef = this.dialog.open(ModalStoriesComponent, {
      width: '80%',
      data: {
        images: this.stories.map(s => s.img),
        titles: this.stories.map(s => s.user),
        userId: this.stories.map(s => s.user),
        currentIndex: story.id - 1,
        idEvento: this.idEvento
      }
    });

    this.renderer.addClass(document.body, 'modal-open');

    dialogRef.afterClosed().subscribe(() => {
      this.renderer.removeClass(document.body, 'modal-open');
    });

  }

  roteamento(rota: string) {
    this.router.navigate([`evento/${this.idEvento}/${rota}`]);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.pageX - (event.currentTarget as HTMLElement).offsetLeft;
    this.scrollLeft = (event.currentTarget as HTMLElement).scrollLeft;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    const x = event.pageX - (event.currentTarget as HTMLElement).offsetLeft;
    const walk = (x - this.startX) * 2; // scroll speed
    (event.currentTarget as HTMLElement).scrollLeft = this.scrollLeft - walk;
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDragging = false;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.isDragging = true;
    this.startX = event.touches[0].pageX - (event.currentTarget as HTMLElement).offsetLeft;
    this.scrollLeft = (event.currentTarget as HTMLElement).scrollLeft;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    const x = event.touches[0].pageX - (event.currentTarget as HTMLElement).offsetLeft;
    const walk = (x - this.startX) * 2; // scroll speed
    (event.currentTarget as HTMLElement).scrollLeft = this.scrollLeft - walk;
  }

  @HostListener('touchend')
  onTouchEnd() {
    this.isDragging = false;
  }

}
