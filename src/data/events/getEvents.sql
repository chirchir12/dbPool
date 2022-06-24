SELECT [id]
    [userId],
    [title],
    [description],
    [startDate],
    [startTime],
    [endDate],
    [endTime]
FROM [dbo].[events] WHERE [userId] = @userId
ORDER BY
    [startDate], [startTime]
