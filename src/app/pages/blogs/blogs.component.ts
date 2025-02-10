import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService, Blog } from '../../services/blog.service';
import { OtherServices } from '../../services/otherservices.service';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-blogs',
  standalone: false,
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  displayedBlogs: Blog[] = [];
  searchQuery: string = '';
  selectedFilter: string = '';
  filterValue: string = '';

  // Pagination
  pageSize = 6;
  pageSizeOptions = [6, 12, 24, 48];
  currentPage = 0;
  totalBlogs = 0;

  // Search debounce
  private searchSubject = new Subject<string>();

  // Loading state
  isLoading = false;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private otherServices: OtherServices
  ) {
    // Initialize search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.isLoading = true;
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.otherServices.showalert('error', 'Failed to load blogs');
        this.isLoading = false;
      }
    });
  }

  onReadMore(id: any) {
    this.router.navigate(['/blog', id]);
  }

  onShare(id: any) {
    const blogLink = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(blogLink).then(() => {
      this.otherServices.showalert('info', 'Blog link copied to clipboard!');
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedBlogs();
  }

  private applyFilters(): void {
    this.filteredBlogs = this.blogs.filter((blog) => {
      const matchesSearch = !this.searchQuery ? true :
        blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        blog.topic.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesFilter = !this.selectedFilter ? true :
        this.selectedFilter === 'author' ?
          blog.author.toLowerCase().includes(this.filterValue.toLowerCase()) :
        this.selectedFilter === 'topic' ?
          blog.topic.toLowerCase().includes(this.filterValue.toLowerCase()) :
        this.selectedFilter === 'date' ?
          new Date(blog.date).toLocaleDateString() === new Date(this.filterValue).toLocaleDateString() :
        true;

      return matchesSearch && matchesFilter;
    });

    this.totalBlogs = this.filteredBlogs.length;
    this.currentPage = 0; // Reset to first page when filters change
    this.updateDisplayedBlogs();
  }

  private updateDisplayedBlogs(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.displayedBlogs = this.filteredBlogs.slice(startIndex, startIndex + this.pageSize);
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedFilter = '';
    this.filterValue = '';
    this.applyFilters();
  }
}
