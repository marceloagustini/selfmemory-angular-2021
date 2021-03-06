import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/token.service';
import { Chapter } from 'src/app/models/chapter';
import { Memory } from 'src/app/models/memory';
import { ChapterService } from 'src/app/services/chapter.service';
import { MemoryService } from 'src/app/services/memory.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  chapters: Chapter[]
  memory: Memory

  constructor(
    private memoryService: MemoryService,
    private chapterService: ChapterService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.memoryService.createOrReadMemory(this.tokenService.user.id).subscribe(data => {
      if (data) {
        this.memory = data
        this.memoryService.getChapters(this.memory.id).subscribe(chapters => {
          this.chapters = chapters
        })
      }
    })
  }

  remove(id, index) {
    this.chapterService.remove(id).subscribe(data => {
      this.chapters.splice(index, 1)
    })
  }

}
