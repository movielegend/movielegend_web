-- Create Categories table
CREATE TABLE Categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(MAX) NULL,
    parentId INT NULL,
    createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Categories_Parent FOREIGN KEY (parentId) REFERENCES Categories(id)
);
GO

-- Create Brands table
CREATE TABLE Brands (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logoUrl NVARCHAR(1000) NULL,
    description NVARCHAR(MAX) NULL,
    createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);
GO

-- Create Products table
CREATE TABLE Products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    sku VARCHAR(100) NOT NULL UNIQUE,
    description NVARCHAR(MAX) NULL,
    shortDesc NVARCHAR(500) NULL,
    price DECIMAL(18, 2) NOT NULL,
    originalPrice DECIMAL(18, 2) NULL,
    stockQuantity INT NOT NULL DEFAULT 0,
    isAvailable BIT NOT NULL DEFAULT 1,
    isFeatured BIT NOT NULL DEFAULT 0,
    categoryId INT NOT NULL,
    brandId INT NOT NULL,
    createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Products_Categories FOREIGN KEY (categoryId) REFERENCES Categories(id),
    CONSTRAINT FK_Products_Brands FOREIGN KEY (brandId) REFERENCES Brands(id)
);
GO

-- Create ProductImages table
CREATE TABLE ProductImages (
    id INT IDENTITY(1,1) PRIMARY KEY,
    productId INT NOT NULL,
    url NVARCHAR(1000) NOT NULL,
    altText NVARCHAR(255) NULL,
    isPrimary BIT NOT NULL DEFAULT 0,
    displayOrder INT NOT NULL DEFAULT 0,
    createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_ProductImages_Products FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE
);
GO

-- Create ProductSpecifications table
CREATE TABLE ProductSpecifications (
    id INT IDENTITY(1,1) PRIMARY KEY,
    productId INT NOT NULL,
    specName NVARCHAR(255) NOT NULL,
    specValue NVARCHAR(1000) NOT NULL,
    createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_ProductSpecifications_Products FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE
);
GO
