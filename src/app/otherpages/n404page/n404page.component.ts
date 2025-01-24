import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-n404page',
  standalone: false,
  templateUrl: './n404page.component.html',
  styleUrls: ['./n404page.component.css']
})
export class N404pageComponent implements OnInit {
  errorMessage: string = "Oops! The page you are looking for doesn't exist.";
  errorCodes: { [key: string]: string } = {
    '18': 'The requested course is not found',
    '21': 'Knock, knock.. FBI , Identify yourself',
    '401': 'Unauthorized access',
    '403': 'Forbidden access',
    '5558': 'Be careful, curiosity kills the cat',
    '5559': 'Found it, didn\'t you? a proverb says....',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const errorCode = this.route.snapshot.queryParamMap.get('errorCode');
    if (errorCode && this.errorCodes[errorCode]) {
      this.errorMessage = this.errorCodes[errorCode];
    }
  }
}
