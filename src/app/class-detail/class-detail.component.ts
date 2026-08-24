import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-class-detail',
  imports: [RouterLink],
  templateUrl: './class-detail.component.html',
  styleUrl: './class-detail.component.css',
})
export class ClassDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly classId = this.route.snapshot.paramMap.get('id');
}
