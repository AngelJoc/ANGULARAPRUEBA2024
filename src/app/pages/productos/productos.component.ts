import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/Product.';
import { ProductService } from 'src/app/services/Product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  private dialogRef: MatDialogRef<any> | undefined;

  displayedColumns: string[] = ['name', 'price','actions'];
  dataSource :Product[] = [];
  form: FormGroup;
  iniForm: Product = {
    id: 0,
    name: '',
    price: 0,
    active: false,
    updated_at: new Date(),
    created_at: new Date()
  }
  constructor(private toast: MatSnackBar,private productService: ProductService, private dialog: MatDialog) { 
    this.form = new FormGroup({
      id: new FormControl(this.iniForm.id),
      name: new FormControl(this.iniForm.name),
      price: new FormControl(this.iniForm.price),
      active: new FormControl(this.iniForm.active),
      created_at: new FormControl(this.iniForm.created_at),
      updated_at: new FormControl(this.iniForm.updated_at),

    });
  }

  async ngOnInit(): Promise<void> {
    await this.listar()
  }
  async listar(){
    var data:Product[] = await this.productService.listar() as Product[]
    this.dataSource = data
  }
  async openModal(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(dialog, {
      data: {name:'Nuevo'},
    });
  }
  setData(data: Product) {
    this.form.patchValue(data);
  }
  async guardar() {
    try {
      if (this.form.valid) {
        let id = this.form.get("id")?.value;
        var data
        if (id == 0) {
          data = await this.productService.crear(this.form.value);
        } else {
          data = await this.productService.actualizar(this.form.value);
        }
        if (data != null) {
          this.resetForm();
          this.dialogRef?.close();
          await this.listar();
          this.openSnackBar("Guardado correcto", "Ok");
        } else {
          this.openSnackBar("Hubo un inconceniente al guardar", "Ok");
        }
      } else {
        this.openSnackBar("Los datos del formulario son invalidos", "Ok");
      }
    } catch (error:any) {
      this.openSnackBar(error.message.toString(), "Ok");
    }
  }
  openSnackBar(message: string, action: string) {
    this.toast.open(message, action);
  }
  resetForm() {
    this.form.patchValue(this.iniForm);
  }
  async openModalEditar(dialog: TemplateRef<any>, data: Product) {
    this.setData(data);
    this.dialogRef = this.dialog.open(dialog, {
      data: {name:'Editar'},
    });
  }
  openModalEliminar(dialog: TemplateRef<any> , ent: Product) {
    this.dialogRef = this.dialog.open(dialog, {
      data: {name:'¿Eliminar?'},
    });
    this.dialogRef.afterClosed().subscribe(async result => {
      if(result){
        await this.eliminar(ent);
      }else{
        this.openSnackBar("Se canceló la operación", "Ok");
      }
    });
  }
  async eliminar(ent: Product): Promise<void> {
    let data = await this.productService.eliminar(ent.id);
    if (data != null) {
      this.dialogRef?.close();
      await this.listar();
      this.openSnackBar("Eliminado correcto", "Ok");
    } else {
      this.openSnackBar("Hubo un inconveniente al realizar la operación", "Ok");
    }
  }
}
