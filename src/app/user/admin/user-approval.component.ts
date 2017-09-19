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
    this.detailService.getDetails().then(res => {
      this.details = res;
    })
  }

  changeTier(id:number,tier:string){
    this.detailService.updateUserTier(id,this.belowThree(tier))
    .then(
      response => {
        // find the index of the array to be replaced
        let index = this.details.findIndex(x => x.id==id);
        // replace that element of array with response.json()
        return this.details[index] = response.json()
        // save the new array as this.details
      }
    )
  }

  belowThree(tier:string){
    let newTier = parseInt(tier);
    if (newTier < 3){
      return newTier+=1
    }
    else {
      return 0
    }
  }

}
