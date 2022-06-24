--- update event
UPDATE [dbo].[events]
SET [title] = @title,
    [description] = @description,
    [startDate] = @startDate,
    [startTime] = @startTime,
    [endDate] = @endDate,
    [endTime] = @endTime

    WHERE [id] = @id AND [userId] = @userId

-- select the event after update
SELECT [id]
    [userId],
    [title],
    [description],
    [startDate],
    [startTime],
    [endDate],
    [endTime]
FROM [dbo].[events] WHERE [userId] = @userId AND [id] = @id
ORDER BY
    [startDate], [startTime]
