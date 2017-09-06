import { Component, OnInit } from '@angular/core';
import { DetailService } from "../detail.service";
import { Detail } from "../../shared/detail.model";

@Component({
  selector: 'app-user-approval',
  templateUrl: './user-approval.component.html',
  styleUrls: ['./user-approval.component.scss']
})
export class UserApprovalComponent implements OnInit {
  details:Detail[]
  constructor(private detailService:DetailService) { }

  ngOnInit() {
    this.detailService.getDetails().then(res => this.details = res)
  }

}
