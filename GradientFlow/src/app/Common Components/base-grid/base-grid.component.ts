import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter, ViewChildren } from '@angular/core';
import { ApplicationUtilities } from '../../DataModel/applicationUtilities';
import { MatCell, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { Enums } from '../../Classes/enums';


@Component({
  selector: 'app-base-grid',
  templateUrl: './base-grid.component.html',
  styleUrls: ['./base-grid.component.scss']
})
export class BaseGridComponent implements OnInit, AfterViewInit{
@ViewChild(MatTable) table: MatTable<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
@ViewChildren('DefaultCol') stretchedCols: MatCell[];

@Input() public title: string;
@Input() public columnsDefinitions: ApplicationUtilities.ColumnDefinition[] = []; 
@Input() public TableData: any[] = [];


@Output() public doubleClick: EventEmitter<any>;

 public columnList: string[] = [];
 public dataSource: MatTableDataSource<any>
 public stringType = Enums.columnType.string;
 public numberType = Enums.columnType.number;
 public NotifButtonType = Enums.columnType.notification;

 ngOnInit(): void {
  
  if(!this.columnsDefinitions.some(x=>true)){
    this.columnList = Object.keys(this.TableData[0]);
    this.columnList.forEach(col => {
      this.columnsDefinitions.push({
        colId: col,
        header: col,
        colType: Enums.columnType.string,
      });     
  });
}
else{
  this.columnsDefinitions.forEach(x=>{
    this.columnList.push(Object.keys(this.TableData[0]).find(y=>y == x.colId) ?? "");
  });
}


this.columnsDefinitions.forEach(colum => {
  colum.colType = colum.colType ?? Enums.columnType.string;
});

  this.dataSource = new MatTableDataSource<any>(this.TableData);
  this.dataSource.sortingDataAccessor = (data, headerId)=>{
    return data[this.columnsDefinitions.find(x=>x.header==headerId)?.colId ?? headerId]
  };

  
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

doubleClickEmitter (row: any) {
  this.doubleClick.emit(row);
}


public refreshTable(){
  this.table.renderRows();
}

}
