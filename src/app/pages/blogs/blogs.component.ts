import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BlogService, Blog } from '../../services/blog.service';
import { OtherServices } from '../../services/otherservices.service';

@Component({
  selector: 'app-blogs',
  standalone: false,
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  searchQuery: string = '';
  selectedFilter: string = '';
  filterValue: string = '';

  constructor(private blogService: BlogService, private router: Router , private otherServices: OtherServices) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data.slice(0, 5); // Fetch the first 5 blogs
      this.filteredBlogs = [...this.blogs]; // Initialize filtered blogs
    });
  }

  onReadMore(id: any) {
     this.router.navigate(['/blog', id]);
  }

  onShare(id: any) {
    const blogLink = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(blogLink).then(() => {
            this.otherServices.showalert( 'info','Blog link copied to clipboard!').subscribe(res=>{

      });
     });
  }

  // Handle search input change
  onSearchChange(): void {
    this.applyFilters();
  }

  // Handle filter input change
  onFilterChange(): void {
    this.applyFilters();
  }

  // Apply search and filter to the blog list
  applyFilters(): void {
    this.filteredBlogs = this.blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        blog.topic.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesFilter =
        this.selectedFilter === 'author'
          ? blog.author.toLowerCase().includes(this.filterValue.toLowerCase())
          : this.selectedFilter === 'topic'
          ? blog.topic.toLowerCase().includes(this.filterValue.toLowerCase())
          : this.selectedFilter === 'date'
          ? new Date(blog.date).toLocaleDateString() === new Date(this.filterValue).toLocaleDateString()
          : true;

      return matchesSearch && matchesFilter;
    });
  }
}
