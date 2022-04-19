-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         8.0.28 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para ServiTec
CREATE DATABASE IF NOT EXISTS `ServiTec` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ServiTec`;

-- Volcando estructura para tabla ServiTec.Cliente
CREATE TABLE IF NOT EXISTS `Cliente` (
  `nId` int NOT NULL AUTO_INCREMENT,
  `nRut` int NOT NULL,
  `cNombre` varchar(60) NOT NULL,
  `cDireccion` varchar(60) NOT NULL,
  `cFono` varchar(20) NOT NULL,
  `cEmail` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`nId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ServiTec.Cliente: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
INSERT INTO `Cliente` (`nId`, `nRut`, `cNombre`, `cDireccion`, `cFono`, `cEmail`) VALUES
	(1, 123, 'METALÚRGICA SPA.', 'DIRECCION 123', 'FONO 123', 'email123@sitio.cl'),
	(7, 4321, 'JUANITO PÉREZ HEREDIA', 'CALLE NUEVA 4321', '43210 anexo 12', 'as@tro.cl'),
	(8, 5555555, 'JUANITO SpA', 'ALGUNA CALLE nº 20', '5565679', 'correo@google.com');
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;

-- Volcando estructura para tabla ServiTec.ContratoMantencion
CREATE TABLE IF NOT EXISTS `ContratoMantencion` (
  `nContrato` int NOT NULL AUTO_INCREMENT,
  `nIdCliente` int DEFAULT NULL,
  `fDesde` varchar(10) NOT NULL,
  `fHasta` varchar(10) NOT NULL,
  `nPeriodicidad` int NOT NULL COMMENT 'Nro. de meses entre mantenciones',
  PRIMARY KEY (`nContrato`),
  KEY `FK_Reference_1` (`nIdCliente`),
  CONSTRAINT `FK_Reference_1` FOREIGN KEY (`nIdCliente`) REFERENCES `Cliente` (`nId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ServiTec.ContratoMantencion: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `ContratoMantencion` DISABLE KEYS */;
INSERT INTO `ContratoMantencion` (`nContrato`, `nIdCliente`, `fDesde`, `fHasta`, `nPeriodicidad`) VALUES
	(4, 8, '2022-03-15', '2022-12-31', 2),
	(5, 1, '2022-05-01', '2023-04-30', 2),
	(6, 7, '2022-05-01', '2023-04-30', 3);
/*!40000 ALTER TABLE `ContratoMantencion` ENABLE KEYS */;

-- Volcando estructura para tabla ServiTec.EquipoContrato
CREATE TABLE IF NOT EXISTS `EquipoContrato` (
  `nId` int NOT NULL AUTO_INCREMENT,
  `nContrato` int NOT NULL,
  `cNombre` varchar(40) NOT NULL,
  PRIMARY KEY (`nId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ServiTec.EquipoContrato: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `EquipoContrato` DISABLE KEYS */;
INSERT INTO `EquipoContrato` (`nId`, `nContrato`, `cNombre`) VALUES
	(2, 2, 'A/C 9000 btu'),
	(3, 2, 'purificador de agua'),
	(4, 3, 'freidora industrial'),
	(5, 2, 'Refrigerador horizontal 300lt');
/*!40000 ALTER TABLE `EquipoContrato` ENABLE KEYS */;

-- Volcando estructura para función ServiTec.fnUltimoContrato
DELIMITER //
CREATE FUNCTION `fnUltimoContrato`( nIdCliente INT ) RETURNS int
    READS SQL DATA
BEGIN
   DECLARE nContrato INT DEFAULT 0;

	SET nContrato = 
		(SELECT cm.nContrato
			FROM ContratoMantencion cm
			WHERE cm.nIdCliente = idCliente
			AND  cm.fHasta >= CURDATE()
		);

   RETURN nContrato;

END//
DELIMITER ;

-- Volcando estructura para tabla ServiTec.OrdenTrabajo
CREATE TABLE IF NOT EXISTS `OrdenTrabajo` (
  `nId` int NOT NULL AUTO_INCREMENT,
  `nContrato` int NOT NULL,
  `nIdSupervisor` int NOT NULL,
  `fProgramada` varchar(10) NOT NULL,
  `fEjecucion` varchar(10) DEFAULT NULL,
  `cObservaciones` varchar(90) NOT NULL,
  PRIMARY KEY (`nId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ServiTec.OrdenTrabajo: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `OrdenTrabajo` DISABLE KEYS */;
INSERT INTO `OrdenTrabajo` (`nId`, `nContrato`, `nIdSupervisor`, `fProgramada`, `fEjecucion`, `cObservaciones`) VALUES
	(5, 4, 8, '2022-05-02', '', 'entre 9 y 10am'),
	(7, 5, 8, '2022-05-06', '', '');
/*!40000 ALTER TABLE `OrdenTrabajo` ENABLE KEYS */;

-- Volcando estructura para tabla ServiTec.Personal
CREATE TABLE IF NOT EXISTS `Personal` (
  `nId` int NOT NULL AUTO_INCREMENT,
  `nRut` int NOT NULL,
  `cNombre` varchar(60) NOT NULL,
  `cDireccion` varchar(60) NOT NULL,
  `cFono` varchar(20) NOT NULL,
  PRIMARY KEY (`nId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ServiTec.Personal: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `Personal` DISABLE KEYS */;
INSERT INTO `Personal` (`nId`, `nRut`, `cNombre`, `cDireccion`, `cFono`) VALUES
	(4, 333211, 'JUAN PÉREZ KLEIN', 'ALGUNA CALLE Nº 44', '32323232'),
	(5, 44444444, 'MARIA PINTO JOEL', 'OTRA CALLE Nro. 5', '4545454'),
	(6, 555656, 'PEDRO PABLO DÍAZ', 'AV. PORTUGAL 4545', '55554554'),
	(8, 77778787, 'CLAUDIA ESCALONA', 'OTRA CALLE 123', '7767654');
/*!40000 ALTER TABLE `Personal` ENABLE KEYS */;

-- Volcando estructura para tabla ServiTec.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ServiTec.usuarios: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `password`, `username`) VALUES
	(1, '$2a$12$7a0SdX4SnaR9vimIgB0SieVG2S4rFwE4EcZNWUX.bumIv2FEn4tFC', 'kris2');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

-- Volcando estructura para vista ServiTec.vistaot
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `vistaot` (
	`nId` INT(10) NOT NULL,
	`fProgramada` VARCHAR(10) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`fEjecucion` VARCHAR(10) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`cObservaciones` VARCHAR(90) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`nContrato` INT(10) NOT NULL,
	`fDesde` VARCHAR(10) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`fHasta` VARCHAR(10) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`nPeriodicidad` INT(10) NOT NULL COMMENT 'Nro. de meses entre mantenciones',
	`nIdCli` INT(10) NOT NULL,
	`cRutCli` INT(10) NOT NULL,
	`cNombreCli` VARCHAR(60) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`cDireccionCli` VARCHAR(60) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`cFonoCli` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`cEmailCli` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`nIdSupervisor` INT(10) NOT NULL,
	`cNombreSupervisor` VARCHAR(60) NOT NULL COLLATE 'utf8mb4_0900_ai_ci'
) ENGINE=MyISAM;

-- Volcando estructura para vista ServiTec.vistaot
-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `vistaot`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vistaot` AS select `ot`.`nId` AS `nId`,`ot`.`fProgramada` AS `fProgramada`,`ot`.`fEjecucion` AS `fEjecucion`,`ot`.`cObservaciones` AS `cObservaciones`,`cm`.`nContrato` AS `nContrato`,`cm`.`fDesde` AS `fDesde`,`cm`.`fHasta` AS `fHasta`,`cm`.`nPeriodicidad` AS `nPeriodicidad`,`c`.`nId` AS `nIdCli`,`c`.`nRut` AS `cRutCli`,`c`.`cNombre` AS `cNombreCli`,`c`.`cDireccion` AS `cDireccionCli`,`c`.`cFono` AS `cFonoCli`,`c`.`cEmail` AS `cEmailCli`,`p`.`nId` AS `nIdSupervisor`,`p`.`cNombre` AS `cNombreSupervisor` from (((`ordentrabajo` `ot` join `contratomantencion` `cm` on((`cm`.`nContrato` = `ot`.`nContrato`))) join `cliente` `c` on((`c`.`nId` = `cm`.`nIdCliente`))) join `personal` `p` on((`p`.`nId` = `ot`.`nIdSupervisor`)));

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
