//@/app/dev/featues.features Data.ts

/*read Feature table 
utilise api featur Get Post

*/
/*
model Feature {
  id          String           @id @default(cuid())
  title       String
  slug        String?          @unique // Pour de jolies URLs (ex: /dev/feat/user-login)
  description String?
  type        FeatureType     @default(FEATURE)
  status      FeatureStatus   @default(BACKLOG)
  priority    FeaturePriority @default(MEDIUM)
  order       Int             @default(0) // Pour le drag & drop dans les vues Kanban
  
  // Dates
  dueDate     DateTime?       // Date limite
  startedAt   DateTime?       // Date de début effective
  completedAt DateTime?       // Date de fin

  // Estimations
  estimatedPoints Int?        // Story points ou heures estimées
  estimatedHours  Float?      // Estimation en temps réel

  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  // RELATION HIÉRARCHIQUE (Auto-référence)
  // Un élément peut avoir un parent (Epic parent d'une Feature, ou Feature parent d'une Task)
  parentId    String?
  parent      Feature?        @relation("FeatureHierarchy", fields: [parentId], references: [id], onDelete: Cascade)
  children    Feature[]       @relation("FeatureHierarchy")

  // RELATIONS AVEC LE RESTE DE L'APP
  // Lien avec l'organisation pour isoler les données
  organizationId String?
  organization   Organization? @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  // Lien avec l'utilisateur assigné
  assigneeId  String?
  assignee    User?           @relation("FeatureAssignee", fields: [assigneeId], references: [id], onDelete: SetNull)

  // Lien avec le créateur de la tâche
  creatorId   String
  creator     User            @relation("FeatureCreator", fields: [creatorId], references: [id], onDelete: Cascade)

  @@index([organizationId])
  @@index([status])
  @@index([type])
  @@index([parentId])
  @@index([assigneeId])
  @@map("features")
} */