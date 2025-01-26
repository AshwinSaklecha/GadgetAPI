-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Available', 'Deployed', 'Destroyed', 'Decommissioned');

-- CreateTable
CREATE TABLE "Gadget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "codename" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Available',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "decommissioned_at" TIMESTAMP(3),

    CONSTRAINT "Gadget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gadget_codename_key" ON "Gadget"("codename");
