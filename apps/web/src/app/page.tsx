"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Progress } from "@repo/ui/components/progress";
import { Switch } from "@repo/ui/components/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Textarea } from "@repo/ui/components/textarea";
import { Separator } from "@repo/ui/components/separator";
import {
  CheckCircle,
  AlertCircle,
  User,
  Settings,
  Mail,
  Bell,
} from "lucide-react";

export default function Home() {
  const [progress, setProgress] = useState(33);
  const [notifications, setNotifications] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Shadcn UI Demo</h1>
          <p className="text-lg text-gray-600">
            Une démonstration des composants Shadcn UI dans une application
            Next.js
          </p>
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Succès !</AlertTitle>
            <AlertDescription>
              Tous les composants Shadcn UI sont correctement installés.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              Ceci est une alerte d&apos;erreur pour la démonstration.
            </AlertDescription>
          </Alert>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>Développeur Full Stack</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Statut:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  En ligne
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progression du projet</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10%
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10%
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" className="flex-1">
                <User className="w-4 h-4 mr-2" />
                Profil
              </Button>
            </CardFooter>
          </Card>

          {/* Settings Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Paramètres
              </CardTitle>
              <CardDescription>
                Configurez vos préférences et paramètres de compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Compte</TabsTrigger>
                  <TabsTrigger value="preferences">Préférences</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={e =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={e =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select
                      value={formData.role}
                      onValueChange={value => handleInputChange("role", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developer">Développeur</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Bio</Label>
                    <Textarea
                      id="message"
                      placeholder="Parlez-nous de vous..."
                      value={formData.message}
                      onChange={e =>
                        handleInputChange("message", e.target.value)
                      }
                    />
                  </div>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Mode sombre</Label>
                        <p className="text-sm text-gray-500">
                          Activer le thème sombre pour l&apos;interface
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Notifications push</Label>
                        <p className="text-sm text-gray-500">
                          Recevoir des notifications push sur votre appareil
                        </p>
                      </div>
                      <Switch
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Synchronisation automatique</Label>
                        <p className="text-sm text-gray-500">
                          Synchroniser automatiquement vos données
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <div className="space-y-4">
                    <Alert>
                      <Bell className="h-4 w-4" />
                      <AlertTitle>État des notifications</AlertTitle>
                      <AlertDescription>
                        Les notifications sont{" "}
                        {notifications ? "activées" : "désactivées"} pour votre
                        compte.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Emails de marketing</h4>
                          <p className="text-sm text-gray-500">
                            Recevoir des emails sur nos produits
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">
                            Notifications de sécurité
                          </h4>
                          <p className="text-sm text-gray-500">
                            Alertes importantes sur votre compte
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Mises à jour produit</h4>
                          <p className="text-sm text-gray-500">
                            Nouvelles fonctionnalités et améliorations
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Annuler</Button>
              <Button>Sauvegarder les modifications</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Projets actifs</span>
                  <Badge>12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tâches terminées</span>
                  <Badge variant="secondary">148</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Heures travaillées</span>
                  <Badge variant="outline">320h</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Équipe</CardTitle>
              <CardDescription>Membres de votre équipe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Alice Bernard</p>
                    <p className="text-xs text-gray-500">Designer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>CD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Charles Dupont</p>
                    <p className="text-xs text-gray-500">Développeur</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>EM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Emma Martin</p>
                    <p className="text-xs text-gray-500">Product Manager</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                Créer un projet
              </Button>
              <Button className="w-full" variant="outline">
                Inviter un membre
              </Button>
              <Button className="w-full" variant="secondary">
                Voir les rapports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
