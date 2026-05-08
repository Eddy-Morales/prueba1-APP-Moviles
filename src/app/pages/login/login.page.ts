import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, IonModal } from '@ionic/angular';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  @ViewChild('modal') modal!: IonModal;

  email: string = '';
  password: string = '';

  registerEmail: string = '';
  registerPassword: string = '';


  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private supabaseService: SupabaseService
  ) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    try {
      const { data, error } = await this.supabaseService.signIn(this.email, this.password);

      if (error) {
        throw error;
      }

      if (data.user) {
        this.router.navigate(['/tabs']);
      }
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error de Autenticación',
        message: error.message || 'No se pudo iniciar sesión. Verifica tus credenciales.',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      await loading.dismiss();
    }
  }

  async onRegister() {
    if (!this.registerEmail || !this.registerPassword) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creando cuenta...',
    });
    await loading.present();

    try {
      const { data, error } = await this.supabaseService.signUp(this.registerEmail, this.registerPassword);

      if (error) {
        throw error;
      }

      if (data.user) {
        const alert = await this.alertController.create({
          header: 'Registro Exitoso',
          message: 'Tu cuenta ha sido creada. Por favor, verifica tu correo si es necesario e inicia sesión.',
          buttons: ['OK'],
        });
        await alert.present();
        this.modal.dismiss();
        
        // Limpiar campos
        this.registerEmail = '';
        this.registerPassword = '';
      }
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error de Registro',
        message: error.message || 'No se pudo crear la cuenta.',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      await loading.dismiss();
    }
  }
}

