-- Cấu trúc CSDL MovieLegend (Production)
-- Dành cho SQL Server
-- Tự động sinh từ Prisma Schema + Tuỳ chỉnh SP, View và Seed Data

-- ==========================================
-- VIEW: THỐNG KÊ DOANH THU (DASHBOARD ANALYTICS)
-- ==========================================
CREATE OR ALTER VIEW vw_Dashboard_Revenue AS
SELECT
    CAST(createdAt AS DATE) AS Date,
    SUM(totalAmount) AS TotalRevenue,
    COUNT(id) AS TotalOrders
FROM Orders
WHERE status = 'COMPLETED' AND deletedAt IS NULL
GROUP BY CAST(createdAt AS DATE);
GO

-- ==========================================
-- STORED PROCEDURE: LẤY THỐNG KÊ TỔNG HỢP DASHBOARD
-- ==========================================
CREATE OR ALTER PROCEDURE sp_GetDashboardStats
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Tổng doanh thu
    DECLARE @TotalRevenue DECIMAL(18,2) = ISNULL((SELECT SUM(totalAmount) FROM Orders WHERE status = 'COMPLETED' AND deletedAt IS NULL), 0);
    
    -- 2. Đơn hàng mới
    DECLARE @NewOrders INT = (SELECT COUNT(id) FROM Orders WHERE status = 'PENDING' AND deletedAt IS NULL);

    -- Lấy thông tin tổng quan
    SELECT @TotalRevenue AS TotalRevenue, @NewOrders AS NewOrders;

    -- 3. Top sản phẩm bán chạy
    SELECT TOP 5 p.name, SUM(oi.quantity) as TotalSold
    FROM OrderItems oi
    JOIN Orders o ON oi.orderId = o.id
    JOIN Products p ON oi.productId = p.id
    WHERE o.status = 'COMPLETED' AND o.deletedAt IS NULL AND p.deletedAt IS NULL
    GROUP BY p.name
    ORDER BY TotalSold DESC;

    -- 4. Tồn kho thấp
    SELECT id, name, sku, stockQuantity
    FROM Products
    WHERE stockQuantity <= 10 AND deletedAt IS NULL
    ORDER BY stockQuantity ASC;

    -- 5. Bảo hành sắp hết hạn (trong 30 ngày tới)
    SELECT wr.id, c.fullName, c.phone, sn.serial, wr.expiryDate
    FROM WarrantyRegistrations wr
    JOIN Customers c ON wr.customerId = c.id
    JOIN SerialNumbers sn ON wr.serialNumberId = sn.id
    WHERE wr.expiryDate BETWEEN GETDATE() AND DATEADD(day, 30, GETDATE())
      AND wr.deletedAt IS NULL;
END;
GO

-- ==========================================
-- SEED DATA
-- ==========================================
-- Seed Roles
IF NOT EXISTS (SELECT 1 FROM Roles WHERE name = 'Admin')
BEGIN
    INSERT INTO Roles (name, createdAt, updatedAt) VALUES ('Admin', GETDATE(), GETDATE());
    INSERT INTO Roles (name, createdAt, updatedAt) VALUES ('User', GETDATE(), GETDATE());
END
GO

-- Lấy ID của Admin Role
DECLARE @AdminRoleId INT = (SELECT id FROM Roles WHERE name = 'Admin');

-- Seed Users (Admin)
IF NOT EXISTS (SELECT 1 FROM Users WHERE email = 'admin@movielegend.com')
BEGIN
    INSERT INTO Users (roleId, name, email, passwordHash, phone, isActive, createdAt, updatedAt)
    VALUES (@AdminRoleId, 'Super Admin', 'admin@movielegend.com', '$2a$10$xyz...', '0123456789', 1, GETDATE(), GETDATE());
END
GO

-- Seed Settings
IF NOT EXISTS (SELECT 1 FROM Settings WHERE [key] = 'SiteName')
BEGIN
    INSERT INTO Settings ([key], value, createdAt, updatedAt) VALUES ('SiteName', 'MovieLegend', GETDATE(), GETDATE());
    INSERT INTO Settings ([key], value, createdAt, updatedAt) VALUES ('ContactEmail', 'support@movielegend.com', GETDATE(), GETDATE());
END
GO
