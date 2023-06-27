drop database if exists test;
CREATE DATABASE  IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `itens`
--

DROP TABLE IF EXISTS `itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens` (
  `id` int NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT NULL,
  `imagem` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens`
--

LOCK TABLES `itens` WRITE;
/*!40000 ALTER TABLE `itens` DISABLE KEYS */;
INSERT INTO `itens` VALUES (1,'Teclado','Teclado GOtech 120 teclas preto','https://images.unsplash.com/photo-1595044426077-d36d9236d54a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80,'),
                           (2,'Mouse','Mouse GOtech preto 1200dpi','https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80'),
                           (3,'Celular','Celular Samsung Galaxy S20 Ultra 128GB 12GB RAM 6.9" Câmera 108MP','https://images.unsplash.com/photo-1592950630581-03cb41342cc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'),
                           (4,'Serra','Serra Circular makita 7.1/4 1800w 5007n','https://images.unsplash.com/photo-1679797822035-a94531a8b05b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80');
/*!40000 ALTER TABLE `itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servidor`
--

DROP TABLE IF EXISTS `servidor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servidor` (
  `id` int NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `idade` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servidor`
--

LOCK TABLES `servidor` WRITE;
/*!40000 ALTER TABLE `servidor` DISABLE KEYS */;
INSERT INTO `servidor` VALUES (1,'Tere',28),(2,'Danilin',62),(3,'Diego',42);
/*!40000 ALTER TABLE `servidor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-12 11:13:47


CREATE TABLE IF NOT EXISTS `test`.`emprestimo` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `id_item` INT(11) NOT NULL,
  `id_servidor` INT(11) NOT NULL,
  `data_emprestimo` DATE NULL DEFAULT NULL,
  `data_devolucao` DATE NULL DEFAULT NULL,
  INDEX `fk_servidor_has_itens_itens1_idx` (`id_item` ASC) VISIBLE,
  INDEX `fk_servidor_has_itens_servidor_idx` (`id_servidor` ASC) VISIBLE,
  CONSTRAINT `fk_servidor_has_itens_servidor`
    FOREIGN KEY (`id_servidor`)
    REFERENCES `test`.`servidor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_servidor_has_itens_itens1`
    FOREIGN KEY (`id_item`)
    REFERENCES `test`.`itens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


LOCK TABLES `emprestimo` WRITE;
/*!40000 ALTER TABLE `emprestimo` DISABLE KEYS */;
INSERT INTO `emprestimo` VALUES (1,1,1,'2023-06-27','2023-06-30');
/*!40000 ALTER TABLE `emprestimo` ENABLE KEYS */;
UNLOCK TABLES;