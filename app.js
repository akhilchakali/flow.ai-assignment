const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const databasePath = path.join(__dirname, "database.db");

const app = express();
app.use(express.json());

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server running at http://localhost:3000")
    );
  } catch (error) {
    console.log(`db error ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();


app.post("/transactions",  async (request, response) => {
  const { id, type, category, amount, date, description} = request.body;
  const addTransaction = `
  INSERT INTO transactions(id, type, category, amount, date, description)
  VALUES('${id}', '${type}', '${category}', '${amount}', '${date}', '${description}');`;
  addedTransaction = await db.run(addTransaction);
  response.send("Transaction Successfully Added");
});


app.get("/transactions",  async (request, response) => {
  const getTransactions = `
    SELECT
    *
    FROM
    transactions`;
  const returnedTransactions = await db.all(getTransactions);
  response.send(returnedTransactions);
});

app.get("/transactions/:id",  async (request, response) => {
  const {id} = request.params
  const getTransactions = `
    SELECT
    *
    FROM
    transactions where id = ${id}`;
  const returnedTransactions = await db.all(getTransactions);
  response.send(returnedTransactions);
});


app.put("/transactions/:id",  async (request, response) => {
  const { id } = request.params;
  const { type, category, amount, date, description } = request.body;
  const updateTransaction = `
  UPDATE transactions
  SET
  type = '${type}',
  category = '${category}',
  amount = '${amount}',
  date = '${date}',
  description = '${description}'
  WHERE 
  id = '${id}';`;
  const updatedTransaction = await db.run(updateTransaction);
  response.send("Transaction Details Updated");
});


app.delete("/transactions/:id", async (request, response) => {
    const {id } = request.params;
    const deleteTransaction = `
    DELETE FROM transactions
    WHERE id = '${id}';`;
    const deletedTransaction = await db.run(deleteTransaction);
    response.send("Transaction Removed");
  }
);


<div className="accordion-style">
			<Accordion id={category}>
				<AccordionItem opened={opened}>
					<AccordionHeader
						triggerType="icon"
						onClick={() => setIsAccordionOpen(!isAccordionOpen)}
					>
						<AccordionTitle>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									padding: '12px 16px',
									gap: '16px',
								}}
							>
								{isAccordionOpen ? (
									<ChevronDown size={20} color="white" />
								) : (
									<ChevronRight size={20} color="white" />
								)}
								<p
									style={{
										fontStyle: 'normal',
										fontWeight: '400',
										fontSize: '16px',
										lineHeight: '20px',
										minWidth: '30%',
									}}
								>
									{category}
								</p>
								<p
									style={{
										fontStyle: 'normal',
										fontWeight: '400',
										fontSize: '16px',
										lineHeight: '20px',
									}}
								>
									{`${completedQuestions} / ${totalNumberOfQuestions}`}
								</p>
								{completedQuestions ===
									totalNumberOfQuestions &&
									!disabled && (
										<CheckCircleFill
											size={20}
											color="green"
										/>
									)}
							</div>
						</AccordionTitle>
					</AccordionHeader>
					<AccordionDetail>
						{questions?.length &&
							questions?.map(
								(
									{
										combined_assessment_question: question,
										answer,
										explanation,
										example,
										options,
										combined_assessment_id: questionId,
									},
									index,
								) => (
									<RiskAssessmentQuestion
										questionId={questionId}
										category={category}
										question={question}
										answer={answer}
										options={options}
										explanation={explanation}
										example={example}
										saveAnswer={option =>
											saveAnswer({ index, option })
										}
										disabled={disabled}
										opened={opened && index === 0}
									/>
								),
							)}
					</AccordionDetail>
				</AccordionItem>
			</Accordion>
		</div>
