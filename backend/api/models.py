from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

class ReconocimientoImagen(models.Model):
    TipoCategoria = models.CharField(max_length=30)

class CapturaImagen(models.Model):
    Fecha = models.DateField(max_length=50)
    Hora = models.TimeField(max_length=10)
    CategoriaID = models.ForeignKey(ReconocimientoImagen, on_delete=models.CASCADE)

class DataSet(models.Model):
    ImagenID = models.ForeignKey(CapturaImagen, on_delete=models.CASCADE)

class Sensores(models.Model):
    Humedad = models.FloatField(max_length=30)
    Luminosidad = models.FloatField(max_length=30)

class Movimientos(models.Model):
    PosicionX = models.FloatField()
    PosicionY = models.FloatField()
    PosicionZ = models.FloatField()
    OrientacionW = models.FloatField()

class TipoUsuario(models.Model):
    Rol = models.CharField(max_length=15)

class Campo(models.Model):
    NombreCampo = models.CharField(max_length=20)
    Mapa = models.BinaryField(max)

class Robot(models.Model):
    NombreRobot = models.CharField(max_length=30)
    Estado = models.BooleanField(default=False)
    MovimientoID = models.ForeignKey(Movimientos, on_delete=models.CASCADE)
    SensoresID = models.ForeignKey(Sensores, on_delete=models.CASCADE)
    DataID = models.ForeignKey(DataSet, on_delete=models.CASCADE)
    CategoriaID = models.ForeignKey(ReconocimientoImagen, on_delete=models.CASCADE)


class Usuario(models.Model):
    Nombre = models.CharField(max_length=30)
    Email = models.EmailField(max_length=50)
    Password = models.CharField(max_length=100)
    CampoID = models.ForeignKey(Campo, on_delete=models.CASCADE, null=True, blank=True)
    TipoID = models.ForeignKey(TipoUsuario, on_delete=models.CASCADE, null=True, blank=True)
    RobotID = models.ForeignKey(Robot, on_delete=models.CASCADE, null=True, blank=True)